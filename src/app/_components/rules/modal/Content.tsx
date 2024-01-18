import { CloseButton } from "./CloseButton";

export const Content = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute flex items-center justify-center top-0 bottom-0 left-0 right-0 ">
      <div className="absolute bg-gray-800/50 w-full h-full z-20" />
      <div className="relative w-full  max-w-3xl flex flex-col gap-8 justify-center items-center dark:bg-gray-800 bg-white px-4 py-4 m-8 rounded-xl z-30">
        <header className="flex items-end justify-between w-full">
          <h2>Regler</h2>
          <CloseButton onClick={onClose} />
        </header>
        <main className="text-left w-full text-lg flex flex-col gap-2">
          <p>
            Spelet går ut på att gissa när en händelse inträffade. <br />
            Så länge du gissar rätt kronologiskt får du poäng och får fortsätta.
          </p>
          <p>Ju närmare rätt svar du gissat desto fler poäng får du.</p>
          <p>
            20p för helt rätt svar, 10p för +/-1 år, 9p för +/-2år osv ner till
            1p
          </p>
        </main>
      </div>
    </div>
  );
};
