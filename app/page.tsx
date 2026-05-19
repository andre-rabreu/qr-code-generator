import { QrGenerator } from "./components/qr-generator";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
      <QrGenerator />
    </div>
  );
}
