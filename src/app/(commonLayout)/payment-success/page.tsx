import Link from "next/link";
import {
  CheckCircle,
  CreditCard,
  CalendarDays,
  Clock,
  Hash,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { env } from "@/env";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

type PaymentDetail = {
  id: string;
  bookingId: string;
  transactionId: string;
  provider: string;
  providerTransactionId: string;
  providerPaymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  booking?: {
    id: string;
    tutorProfileId: string;
    studentId: string;
    slotId: string;
    status: string;
    note: string;
    createdAt: string;
    updatedAt: string;
    tutorSubjectId: string;
    price: number;
    currency: string;
    tutorSubject?: {
      category?: { name: string };
      tutorProfile?: { user?: { name: string; email: string } };
    };
    slot?: { startAt: string; endAt: string; duration: number };
    student?: { name: string; email: string };
  };
};

type PaymentResponse = {
  success: boolean;
  data?: PaymentDetail;
  message?: string;
};

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const formatMoney = (amount: number, currency: string) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
};

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawProviderTransactionId = params.providerTransactionId;
  const providerTransactionId =
    Array.isArray(rawProviderTransactionId) &&
    rawProviderTransactionId.length > 0
      ? rawProviderTransactionId[0]
      : rawProviderTransactionId;
  console.log(providerTransactionId);
  if (!providerTransactionId) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <h1 className="text-3xl font-semibold">
            Payment details unavailable
          </h1>
          <p className="mt-4 text-muted-foreground">
            No provider transaction id was provided. Please return to the home
            page and try again.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }
  const cookieStore = await cookies();

  const response = await fetch(
    `${env.API_URL}/api/payment/details/${providerTransactionId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
    },
  );

  const payload = (await response.json()) as PaymentResponse;
  console.log(payload);

  if (!payload.success || !payload.data) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-sm">
          <h1 className="text-3xl font-semibold">
            Payment verification failed
          </h1>
          <p className="mt-4 text-muted-foreground">
            We could not load your payment details. Please try again later or
            contact support.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const payment = payload.data;
  const booking = payment.booking;
  const tutorName = booking?.tutorSubject?.tutorProfile?.user?.name ?? "Tutor";
  const studentName = booking?.student?.name ?? "Student";
  const subjectName = booking?.tutorSubject?.category?.name ?? "Subject";
  const sessionStart = booking?.slot?.startAt
    ? formatDate(booking.slot.startAt)
    : "N/A";
  const sessionEnd = booking?.slot?.endAt
    ? formatDate(booking.slot.endAt)
    : "N/A";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div>
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="h-6 w-6" />
                  <CardTitle className="text-2xl">Payment Successful</CardTitle>
                </div>
                <CardDescription className="mt-2 text-base">
                  Your payment was confirmed successfully. Booking and payment
                  details are shown below.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Amount Paid
                  </p>
                  <p className="mt-2 text-2xl font-semibold">
                    {formatMoney(payment.amount / 1, payment.currency)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Payment Status
                  </p>
                  <p className="mt-2 text-xl font-semibold text-emerald-600">
                    {payment.status}
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Provider
                  </p>
                  <p className="mt-2 text-base font-semibold">
                    {payment.provider}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="mt-2 text-base font-semibold">
                    {payment.paymentMethod}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Transaction Id
                  </p>
                  <p className="mt-2 text-base font-semibold break-all">
                    {payment.transactionId}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  Payment reference
                </p>
                <p className="text-sm text-foreground">
                  {payment.providerTransactionId}
                </p>
              </div>
              <Button asChild>
                <Link href="/">Continue browsing</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>
                Review the session and student details for this paid booking.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Tutor
                  </p>
                  <p className="mt-2 text-base font-semibold">{tutorName}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Student
                  </p>
                  <p className="mt-2 text-base font-semibold">{studentName}</p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Subject
                  </p>
                  <p className="mt-2 text-base font-semibold">{subjectName}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Session Start
                  </p>
                  <p className="mt-2 text-base font-semibold">{sessionStart}</p>
                </div>
                <div className="rounded-2xl border border-border bg-background p-5">
                  <p className="text-sm font-medium text-muted-foreground">
                    Session End
                  </p>
                  <p className="mt-2 text-base font-semibold">{sessionEnd}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="rounded-3xl border border-border bg-background p-6">
            <CardHeader>
              <CardTitle className="text-lg">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Provider transaction</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {payment.providerTransactionId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Hash className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Payment intent</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {payment.providerPaymentIntentId}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Payment created</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(payment.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-medium">Last updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(payment.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-border bg-background p-6">
            <CardHeader>
              <CardTitle className="text-lg">Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  ✔️ Your booking is confirmed and payment has been recorded.
                </li>
                <li>✔️ You will receive an email confirmation shortly.</li>
                <li>
                  ✔️ Return to the dashboard to view or manage your booking.
                </li>
              </ul>
            </CardContent>
            <CardFooter className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button asChild>
                <Link href="/">Go to dashboard</Link>
              </Button>
              {booking?.tutorProfileId ? (
                <Button variant="outline" asChild>
                  <Link href={`/tutors/${booking.tutorProfileId}`}>
                    View tutor details
                  </Link>
                </Button>
              ) : null}
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
