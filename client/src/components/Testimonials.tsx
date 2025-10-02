import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import avatar1 from "@assets/stock_images/professional_headsho_ed4aac17.jpg";
import avatar2 from "@assets/stock_images/professional_headsho_60521352.jpg";
import avatar3 from "@assets/stock_images/professional_headsho_f447f194.jpg";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Content Creator",
    avatar: avatar1,
    quote: "The photo editor is incredible! I can edit my photos in seconds and the filters are professional-grade. Game changer for my workflow.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Music Blogger",
    avatar: avatar2,
    quote: "Finding the right music for my mood has never been easier. The Spotify integration is seamless and recommendations are always spot-on.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Social Media Manager",
    avatar: avatar3,
    quote: "I use both features daily. Edit photos for posts and discover music for my stories. It's like having two powerful tools in one place.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-16 px-4 md:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Creators
          </h2>
          <p className="text-lg text-muted-foreground">
            See what our users have to say
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-8 text-sm text-muted-foreground">
            <div>
              <p className="text-3xl font-bold text-foreground">10,000+</p>
              <p>Photos Edited</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground">5,000+</p>
              <p>Playlists Created</p>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <p className="text-3xl font-bold text-foreground">98%</p>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
