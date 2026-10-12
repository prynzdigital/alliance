const DEFAULT_SRC = "https://donorbox.org/embed/general-donation-36?default_interval=o";

// Live Donorbox campaign (client-supplied link, confirmed 2026-09-29 — see
// docs/discovery/20_Client_Input_Required.md, item 17). Embedded on-page per
// docs/discovery/14_Technical_Architecture.md. The URL is editable in the admin
// (Site Content → Donations) but only donorbox.org embed links are accepted,
// so a bad edit can't put an arbitrary page in this frame.
export function DonorboxEmbed({ src }: { src?: string }) {
  const safeSrc = src && /^https:\/\/donorbox\.org\/embed\//.test(src) ? src : DEFAULT_SRC;
  return (
    <iframe
      src={safeSrc}
      title="Donate to SOC Alliance"
      name="donorbox"
      seamless
      frameBorder={0}
      scrolling="no"
      height={900}
      width="100%"
      style={{ maxWidth: 500, minWidth: 250, maxHeight: "none" }}
      className="rounded-card"
    />
  );
}
