import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
 id?: string;
 className?: string;
 children: React.ReactNode;
 delay?: number;
}

export function Section({
 id,
 className,
 children,
 delay = 0,
 ...props
}: SectionProps) {
 return (
  <section
   id={id}
   className={cn("py-16 md:py-24", className)}
   {...props}
  >
   <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.5, delay }}
    className="container mx-auto px-4 md:px-6"
   >
    {children}
   </motion.div>
  </section>
 );
}
