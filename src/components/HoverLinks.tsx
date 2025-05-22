import "./styles/style.css";

interface HoverLinksProps {
  text: string;
  cursor?: boolean;
  "data-target"?: string;
}

const HoverLinks = ({ text, cursor, "data-target": target }: HoverLinksProps) => {
  return (
    <div className="hover-link" data-cursor={!cursor && `disable`} data-target={target}>
      <div className="hover-in">
        {text} <div>{text}</div>
      </div>
    </div>
  );
};

export default HoverLinks;
