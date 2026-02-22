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
      className={cn("py-16 md:py-20", className)}
      {...props}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.4, delay }}
        className="max-w-6xl mx-auto px-4 md:px-8 overflow-visible"
      >
        {children}
      </motion.div>
    </section>
  );
}
