import { LinkButton } from "@/components/ui/Actions";
import { Section } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Section className="pt-44 md:pt-56">
      <div className="gutter">
        <p className="eyebrow text-ash">404</p>
        <h1 className="display-lg mt-12 max-w-3xl">
          That page
          <br />
          <span className="italic-display">grew out.</span>
        </h1>
        <p className="body-lede mt-10 max-w-md text-ash">
          Nothing here. The work, the team and the booking are all still where you left them.
        </p>
        <div className="mt-12 flex flex-wrap gap-3">
          <LinkButton href="/" variant="solid">
            Back to the salon
          </LinkButton>
          <LinkButton href="/artists">Meet the artists</LinkButton>
        </div>
      </div>
    </Section>
  );
}
