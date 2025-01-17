import { Button } from "@/components/ui/button"
import Image from "next/image"

const courses = [
  {
    id: 1,
    title: "Full-Stack Web Development",
    description: "Master both frontend and backend development with modern technologies like React, Node.js, and databases.",
    image: "/web.jpg",
    duration: "24 weeks",
    level: "Beginner to Advanced"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Learn to create beautiful, user-friendly interfaces and experiences using industry-standard design tools.",
    image: "/graphic.jpg",
    duration: "12 weeks",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "Mobile App Development",
    description: "Build cross-platform mobile applications using React Native and modern app development practices.",
    image: "/motion.jpg",
    duration: "16 weeks",
    level: "Intermediate"
  }
]

export function Courses() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Our Featured Courses
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
            Choose from our selection of comprehensive courses designed to take you from beginner to professional.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {courses.map((course) => (
            <div
              key={course.id}
              className="group relative overflow-hidden rounded-lg border backdrop-blur-sm bg-background/20 hover:bg-background/30 transition-all duration-300"
            >
              <div className="relative h-60 w-full overflow-hidden rounded-t-lg">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-1">
                    <span className="text-sm text-muted-foreground">
                      {course.duration}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {course.level}
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="backdrop-blur-sm bg-background/30 border-primary/20 hover:bg-background/50 transition-colors"
                  >
                    View Details
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 