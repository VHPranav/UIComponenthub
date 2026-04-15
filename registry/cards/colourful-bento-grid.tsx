// "use client"

// import React, { ReactNode } from "react"
// import { motion } from "framer-motion"
// import { 
//   Stethoscope, 
//   Plane, 
//   ShoppingCart, 
//   Store, 
//   Utensils, 
//   Building2,
//   ArrowRight
// } from "lucide-react"
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"

// interface BentoGridProps {
//   children: ReactNode
//   className?: string
// }

// export const BentoGrid = ({ children, className }: BentoGridProps) => {
//   return (
//     <div
//       className={cn(
//         "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
//         className
//       )}
//     >
//       {children}
//     </div>
//   )
// }

// interface BentoCardProps {
//   name: string
//   className: string
//   background: ReactNode
//   Icon: React.ElementType
//   description: string
//   href: string
//   cta: string
// }

// export const BentoCard = ({
//   name,
//   className,
//   background,
//   Icon,
//   description,
//   href,
//   cta,
// }: BentoCardProps) => (
//   <div
//     key={name}
//     className={cn(
//       "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-xl",
//       // light styles
//       "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
//       // dark styles
//       "transform-gpu dark:bg-black dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
//       className
//     )}
//   >
//     <div>{background}</div>
//     <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
//       <Icon className="h-12 w-12 origin-left transform-gpu text-neutral-700 transition-all duration-300 ease-in-out group-hover:scale-75" />
//       <h3 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300">
//         {name}
//       </h3>
//       <p className="max-w-xs text-neutral-400">{description}</p>
//     </div>

//     <div
//       className={cn(
//         "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
//       )}
//     >
//       <Button variant="ghost" asChild size="sm" className="pointer-events-auto">
//         <a href={href}>
//           {cta}
//           <ArrowRight className="ml-2 h-4 w-4" />
//         </a>
//       </Button>
//     </div>
//     <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
//   </div>
// )

// const features = [
//   {
//     Icon: Stethoscope,
//     name: "Healthcare",
//     description: "Advanced diagnostics and patient care powered by our intelligent AI assistant layer.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-1",
//     background: (
//       <div className="absolute inset-0 bg-[#E0D7FF] opacity-50 transition-all duration-300 group-hover:opacity-70">
//         <img
//           src="https://images.unsplash.com/photo-1576091160550-217359f4886b?auto=format&fit=crop&q=80&w=600"
//           alt="Healthcare"
//           className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
//         />
//       </div>
//     ),
//   },
//   {
//     Icon: Plane,
//     name: "Travel & Hospitality",
//     description: "Seamless booking journeys and personalized guest experiences for every traveler.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-2",
//     background: (
//       <div className="absolute inset-0 bg-[#D1F3F0] opacity-50 transition-all duration-300 group-hover:opacity-70">
//         <img
//           src="https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=800"
//           alt="Travel"
//           className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
//         />
//       </div>
//     ),
//   },
//   {
//     Icon: ShoppingCart,
//     name: "Ecommerce",
//     description: "Driving conversions with intelligent product recommendations and hyper-personalized shopping.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-2",
//     background: (
//       <div className="absolute inset-0 bg-[#FFD4CC] opacity-50 transition-all duration-300 group-hover:opacity-70">
//         <img
//           src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800"
//           alt="Ecommerce"
//           className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
//         />
//       </div>
//     ),
//   },
//   {
//     Icon: Store,
//     name: "Retail",
//     description: "Real-time inventory insights and unified commerce experiences across all touchpoints.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-1",
//     background: (
//       <div className="absolute inset-0 bg-[#EBE0FF] opacity-50 transition-all duration-300 group-hover:opacity-70">
//         <img
//           src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600"
//           alt="Retail"
//           className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
//         />
//       </div>
//     ),
//   },
//   {
//     Icon: Utensils,
//     name: "Restaurant",
//     description: "Smart reservations and menu optimization for modern dining establishments.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-1",
//     background: (
//       <div className="absolute inset-0 bg-[#FDF2CE] opacity-50 transition-all duration-300 group-hover:opacity-70">
//         <img
//           src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=600"
//           alt="Restaurant"
//           className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
//         />
//       </div>
//     ),
//   },
//   {
//     Icon: Building2,
//     name: "Enterprise",
//     description: "Scalable AI solutions designed to streamline complex corporate workflows and data.",
//     href: "#",
//     cta: "Learn more",
//     className: "col-span-3 lg:col-span-2",
//     background: (
//       <div className="absolute inset-0 bg-[#FFDDEE] opacity-50 transition-all duration-300 group-hover:opacity-70">
//         <img
//           src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
//           alt="Enterprise"
//           className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-multiply transition-all duration-500 group-hover:scale-110"
//         />
//       </div>
//     ),
//   },
// ]

// export function ColourfulBentoGrid() {
//   return (
//     <div className="w-full max-w-7xl mx-auto py-12 px-4 md:px-0">
//       <div className="mb-12 space-y-2 text-center md:text-left">
//         <h2 className="text-4xl md:text-6xl font-medium tracking-tighter text-zinc-900 dark:text-zinc-100">
//           Transforming Industries
//         </h2>
//         <p className="text-xl text-zinc-500 dark:text-zinc-400">
//           One Intelligent Interaction at a Time.
//         </p>
//       </div>
//       <BentoGrid>
//         {features.map((feature, idx) => (
//           <BentoCard key={idx} {...feature} />
//         ))}
//       </BentoGrid>
//     </div>
//   )
// }
