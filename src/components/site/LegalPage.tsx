import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * Shared shell for the two legal routes. These exist so the footer links are
 * live in the prototype — the copy is a placeholder and needs a real policy
 * before launch.
 */
export function LegalPage({
  title,
  intro,
  sections,
}: {
  title: string;
  intro: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <Section className="pt-40 md:pt-52">
      <div className="gutter grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Reveal variant="fade" className="border-t border-ink/12 pt-4">
            <span className="eyebrow text-ash">Vogue Laguna Beach</span>
          </Reveal>
          <h1 className="display-lg mt-12">{title}</h1>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <Reveal variant="up">
            <p className="body-lede text-charcoal">{intro}</p>
            <p className="mt-6 border-l border-bronze/40 pl-5 text-[0.78rem] leading-relaxed font-light text-ash">
              Placeholder text for the design prototype. A reviewed policy must replace this
              before the site goes live.
            </p>
          </Reveal>

          <div className="mt-14">
            {sections.map((section, i) => (
              <Reveal
                as="section"
                key={section.heading}
                variant="up"
                delay={i * 80}
                className="border-t border-ink/12 py-8"
              >
                <h2 className="display-sm">{section.heading}</h2>
                <p className="mt-4 max-w-xl text-[0.95rem] leading-[1.85] text-ash">
                  {section.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
