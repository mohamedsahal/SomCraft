export default function AboutPage() {
  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-6">About SomCraft Academy</h1>

      <p className="text-lg text-muted-foreground mb-8">
        SomCraft Academy is dedicated to empowering the next generation of
        developers with practical skills and real-world experience.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground">
            We believe in making quality coding education accessible to everyone.
            Through our comprehensive curriculum, hands-on projects, and supportive
            community, we help aspiring developers build the skills they need to
            succeed in today's tech industry.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <p className="text-muted-foreground">
            Whether you're just starting your coding journey or looking to enhance
            your skills, SomCraft Academy is here to support your growth.
            Our courses combine theory with practical application, ensuring you're
            ready to tackle real-world challenges.
          </p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="flex items-start">
            <div>
              <h3 className="font-medium">Excellence in Education</h3>
              <p className="text-muted-foreground">We strive to provide the highest quality programming education.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div>
              <h3 className="font-medium">Community-Driven Learning</h3>
              <p className="text-muted-foreground">We foster a supportive environment where students learn and grow together.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div>
              <h3 className="font-medium">Practical Skill Development</h3>
              <p className="text-muted-foreground">We focus on real-world applications and hands-on experience.</p>
            </div>
          </li>
          <li className="flex items-start">
            <div>
              <h3 className="font-medium">Innovation and Creativity</h3>
              <p className="text-muted-foreground">We encourage creative problem-solving and innovative thinking.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
} 