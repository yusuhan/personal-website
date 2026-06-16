import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Products from "@/components/sections/Products";
import Writing from "@/components/sections/Writing";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <Products />
        <Writing />
        <About />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-sm text-muted">
        © {new Date().getFullYear()} 余苏涵
      </footer>
    </>
  );
}
