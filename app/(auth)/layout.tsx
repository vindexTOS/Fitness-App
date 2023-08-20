import { roboto_mono } from "../fonts";
export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={`bg-gradient-to-r from-[#ECD8FA] to-[#E0FFFD] ${roboto_mono.className}`}
    >
      {children}
    </div>
  );
}
