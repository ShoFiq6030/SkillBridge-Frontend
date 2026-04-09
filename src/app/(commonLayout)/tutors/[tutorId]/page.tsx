import { tutorService } from "@/services/tutor.service";
import Slots from "@/components/modules/tutordetailspage/Slots";
import Reviews from "@/components/modules/tutordetailspage/Reviews";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, DollarSign } from "lucide-react";
import { Tutor, TutorSubject } from "@/types/tutor.type";
import { authClient } from "@/lib/auth-client";

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ tutorId: string }>;
}) {
  const { tutorId } = await params;
  const { data: tutor, error } = await tutorService.getTutorByTutorId(tutorId);

  // const session = await getUserInServer();
  // console.log(session);

  // console.log(tutor);

  if (error || !tutor) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-destructive">
              {error?.message || "Tutor not found"}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={tutor.user?.image || "https://via.placeholder.com/100"}
                    alt={tutor.user.name}
                    className="w-24 h-24 rounded-full object-cover border-2 border-primary/20"
                  />
                  <div>
                    <CardTitle className="text-2xl mb-2">
                      {tutor.user.name}
                    </CardTitle>
                    <p className="text-muted-foreground mb-1">
                      {tutor.headline}
                    </p>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < Math.round(tutor.avgRating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({tutor.totalReviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  Favorite
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Hourly Rate</p>
                    <p className="font-semibold">
                      {tutor.currency} {tutor.hourlyRate}/hr
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Experience</p>
                    <p className="font-semibold">
                      {tutor.experienceYears} years
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Language</p>
                    <p className="font-semibold">{tutor.language}</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground">{tutor.bio}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Subjects</h3>
                <div className="flex flex-wrap gap-2">
                  {tutor.subjects.map((subject: TutorSubject) => (
                    <span
                      key={subject.id}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {subject.category.name}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Slots slots={tutor.slots} subjects={tutor.subjects} />
        </div>

        <div className="lg:col-span-1">
          <Reviews reviews={tutor.reviews} />
        </div>
      </div>
    </div>
  );
}
