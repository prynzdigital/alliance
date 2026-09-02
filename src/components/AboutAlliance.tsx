import { MissionIcon, ValuesIcon, VisionIcon } from "@/components/icons/AboutIcons";
import { Reveal } from "@/components/Reveal";

const items = [
  {
    icon: MissionIcon,
    title: "Mission",
    body: "The Mission is to uplift and improve the life of the community.",
    color: "text-primary",
  },
  {
    icon: VisionIcon,
    title: "Vision",
    body: "The Vision is to create a community in which all people thrive and develop to their greatest potential.",
    color: "text-accent",
  },
  {
    icon: ValuesIcon,
    title: "Values",
    body: "We believe in a four pillar plan to uplift the community, Scholarships, Economic Development, Community and Health.",
    color: "text-secondary-dark",
  },
];

export function AboutAlliance() {
  return (
    <section className="mx-auto max-w-(--container-content) px-6 py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-2 md:items-start md:gap-16">
        <Reveal>
          <p className="text-sm font-bold uppercase tracking-widest text-accent">Who We Are</p>
          <h2 className="mt-3 max-w-md text-4xl font-extrabold leading-[1.1] text-text md:text-5xl">
            About the Alliance
          </h2>
          <p className="mt-6 max-w-md text-text-muted">
            Strengthening Our Community Alliance is a 501(c)(3) organization that provides
            scholarships and community services to the Woodlawn Community and greater Chicago.
            The Alliance will utilize our facility in Woodlawn to hold meetings and conduct
            community service programs. SOC Alliance will also collaborate with the local
            community on numerous programs.
          </p>
        </Reveal>

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isLast = i === items.length - 1;
            return (
              <Reveal key={item.title} delay={i * 75} className={isLast ? "sm:col-span-2" : ""}>
                <Icon className={`h-8 w-8 ${item.color}`} />
                <h3 className="mt-4 text-lg font-bold text-text">{item.title}</h3>
                <p className="mt-2 max-w-sm text-text-muted">{item.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
