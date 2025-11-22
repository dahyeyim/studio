import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { attendees, type Attendee } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Mail, Building, Phone } from 'lucide-react';
import Image from 'next/image';

const getAvatarUrl = (attendee: Attendee) => {
  const placeholder = PlaceHolderImages.find(
    (p) => p.id === `avatar-${(attendees.indexOf(attendee) % 6) + 1}`
  );
  return placeholder?.imageUrl || `https://picsum.photos/seed/${attendee.id}/200/200`;
};

const getAvatarHint = (attendee: Attendee) => {
    const placeholder = PlaceHolderImages.find(
      (p) => p.id === `avatar-${(attendees.indexOf(attendee) % 6) + 1}`
    );
    return placeholder?.imageHint || `person`;
}

export default function AttendeesPage() {
  return (
    <div className="flex flex-1 flex-col p-4 md:p-6">
      <header className="mb-6">
        <h1 className="font-headline text-3xl font-semibold tracking-tight">
          참석자
        </h1>
        <p className="text-muted-foreground">
          SeminarSync 참여자들을 만나보세요.
        </p>
      </header>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {attendees.map((attendee) => (
          <Card
            key={attendee.id}
            className="transform transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl"
          >
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="mb-4 h-24 w-24 border-4 border-background shadow-md">
                <div className="relative aspect-square h-full w-full">
                  <Image
                    src={getAvatarUrl(attendee)}
                    alt={`Avatar of ${attendee.name}`}
                    fill
                    className="rounded-full object-cover"
                    data-ai-hint={getAvatarHint(attendee)}
                  />
                </div>
                <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <CardTitle className="font-headline text-xl">
                {attendee.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Building className="h-4 w-4" />
                <span>{attendee.affiliation}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4" />
                <span>{attendee.email}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{attendee.phone}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
