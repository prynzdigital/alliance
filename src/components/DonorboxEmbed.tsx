// Live Donorbox campaign, confirmed working 2026-09-29 (client-supplied link —
// see docs/discovery/20_Client_Input_Required.md, item 17, now resolved).
// Embedded on-page per docs/discovery/14_Technical_Architecture.md, replacing
// the old site's off-site donation link.
export function DonorboxEmbed() {
  return (
    <iframe
      src="https://donorbox.org/embed/general-donation-36?default_interval=o"
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
