import { 
  BookOpen, 
  Code2, 
  Users, 
  Laptop, 
  Target, 
  Award 
} from "lucide-react"

const features = [
  {
    icon: <BookOpen className="h-10 w-10" />,
    title: "Personalized Learning",
    description: "Custom-tailored learning paths adapted to your skill level and goals, ensuring optimal progress."
  },
  {
    icon: <Code2 className="h-10 w-10" />,
    title: "Project-Based Curriculum",
    description: "Learn by building real-world projects that you can add to your portfolio and showcase to employers."
  },
  {
    icon: <Users className="h-10 w-10" />,
    title: "Expert Mentorship",
    description: "Get guidance from industry professionals with years of experience in web development and design."
  },
  {
    icon: <Laptop className="h-10 w-10" />,
    title: "Industry Tools",
    description: "Master the latest tools and technologies used by top companies in the tech industry."
  },
  {
    icon: <Target className="h-10 w-10" />,
    title: "Career Support",
    description: "Receive ongoing career guidance, interview preparation, and job placement assistance."
  },
  {
    icon: <Award className="h-10 w-10" />,
    title: "Certification",
    description: "Earn recognized certifications upon completion to validate your skills to employers."
  }
]

export function Features() {
  return (
    <section className="py-24">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Why Choose Our Program
          </h2>
          <p className="max-w-[900px] text-muted-foreground text-lg sm:text-xl">
            Our comprehensive program combines cutting-edge curriculum with practical experience and expert guidance.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border backdrop-blur-sm bg-background/20 hover:bg-background/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="mb-4 text-primary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
              
              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 