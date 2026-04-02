"use client";
import React, { useEffect } from "react";
import { motion, useAnimationControls } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: {
    text: string;
    image: string;
    name: string;
    role: string;
  }[];
  duration?: number;
}) => {
  const controls = useAnimationControls()
  const dur = props.duration || 10

  useEffect(() => {
    controls.start({
      translateY: "-50%",
      transition: {
        duration: dur,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
      },
    })
  }, [controls, dur])

  return (
    <div
      className={props.className}
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          translateY: "-50%",
          transition: {
            duration: dur,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          },
        })
      }
    >
      <motion.div
        animate={controls}
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div className="p-10 rounded-3xl border border-ainomiq-border shadow-lg shadow-ainomiq-blue/5 max-w-xs w-full" key={i}>
                  <div className="text-ainomiq-text text-sm leading-relaxed">{text}</div>
                  <div className="flex items-center gap-2 mt-5">
                    <img
                      width={40}
                      height={40}
                      src={image}
                      alt={name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-ainomiq-text">{name}</div>
                      <div className="leading-5 text-ainomiq-text-muted tracking-tight text-sm">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    text: "Ainomiq saved us 76% on monthly costs. What used to take a full team now runs on autopilot.",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "Pim Smit",
    role: "Billie Jeans — App",
  },
  {
    text: "Our customer service responds 24/7 — email, phone, and social media. It's incredible.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Teis",
    role: "Schoolregister — Enterprise",
  },
  {
    text: "We dropped our email marketing agency and saved 3K a month. Ainomiq's automation actually performs better too.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Jens",
    role: "Button Amsterdam — App",
  },
  {
    text: "The real-time dashboard changed how we make decisions. No more guessing, just data that actually makes sense.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "Alpina",
    role: "Enterprise",
  },
  {
    text: "We used to spend 3 hours a day on email campaigns. Now it runs itself and performs better than before.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "La Dos",
    role: "E-commerce",
  },
  {
    text: "Pim and Bink understood our challenges from day one. They built exactly what we needed, nothing more, nothing less.",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Domino's",
    role: "Enterprise",
  },
  {
    text: "The inventory forecasting alone saved us thousands. We never overstock or miss a sale anymore.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "AccuExpert",
    role: "E-commerce",
  },
  {
    text: "Since switching to Ainomiq, our support response time went from 4 hours to under 5 minutes. Customers love it.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "Padelland",
    role: "E-commerce",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 8);

export function TestimonialsColumns() {
  return (
    <section className="px-4 py-16 md:py-32 relative">
      <div className="mx-auto max-w-5xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="border border-ainomiq-border py-1 px-4 rounded-lg text-ainomiq-text-muted text-sm">
            Testimonials
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mt-5 text-ainomiq-text text-center">
            What our clients say
          </h2>
          <p className="text-center mt-5 text-ainomiq-text-muted">
            See why businesses across 58+ countries trust Ainomiq.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
}
