export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Grid pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-color) 1.5px, transparent 1.5px),
            linear-gradient(to bottom, var(--grid-color) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '150px 150px',
          '--grid-color': 'rgba(var(--foreground-rgb), 0.08)'
        } as React.CSSProperties}
      />
      
      {/* Radial gradient for depth */}
      <div className="absolute inset-0 bg-radial-gradient from-background/0 via-background/60 to-background" />
      
      {/* Glass morphing effect */}
      <div className="absolute inset-0 backdrop-blur-[0.5px]" />
    </div>
  )
} 