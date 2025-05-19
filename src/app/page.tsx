import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { ArrowRight, CheckCircle, Users, Building, ShieldAlert, UserCog } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const features = [
    {
      icon: <UserCog className="h-8 w-8 text-primary" />,
      title: 'Admin Control',
      description: 'Full control over users, rooms, announcements, and system settings.',
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: 'Student Portal',
      description: 'Easy room booking, profile management, and access to announcements.',
    },
    {
      icon: <Building className="h-8 w-8 text-primary" />,
      title: 'Staff Tools',
      description: 'Manage residents, maintenance, and inventory efficiently.',
    },
    {
      icon: <ShieldAlert className="h-8 w-8 text-primary" />,
      title: 'Parent Access',
      description: 'Monitor student progress and stay updated with hostel news.',
    },
  ];

  return (
    <PublicLayout>
      <section className="text-center py-12 md:py-20">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Welcome to <span className="text-primary">HOSTEL MANAGEMENT SYSTEM</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          The all-in-one solution for seamless hostel management. Streamline operations, enhance communication, and create a better living experience.
        </p>
        <div className="space-x-4">
          <Button size="lg" asChild>
            <Link href="/login">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-secondary/50 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose HOSTEL MANAGEMENT SYSTEM?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="items-center text-center">
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Image 
              src="https://picsum.photos/600/400?grayscale" 
              alt="Hostel Management Illustration" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-xl"
              data-ai-hint="modern building"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Key Features for Every Role</h2>
            <ul className="space-y-3">
              {[
                "Role-Based Access Control",
                "Personalized Dashboards",
                "Dynamic Announcements",
                "Comprehensive Directory",
                "Easy Room & Booking Management",
                "Maintenance & Complaint Tracking"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-accent mr-3" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="text-center py-12 md:py-20 bg-primary/10 rounded-lg">
         <h2 className="text-3xl font-bold mb-6">Ready to Simplify Your Hostel Management?</h2>
         <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
           Join HOSTEL MANAGEMENT SYSTEM today and experience the future of efficient and organized hostel living.
         </p>
         <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
           <Link href="/login?role=admin">
             Explore Admin Demo <ArrowRight className="ml-2 h-5 w-5" />
           </Link>
         </Button>
      </section>
    </PublicLayout>
  );
}
