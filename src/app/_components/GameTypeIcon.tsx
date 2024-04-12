import { GameType } from "@/gameEngine/gameState";
import { MusicNote, Schedule } from "@mui/icons-material";

export const GameTypeIcon = ({
  gameType,
  size,
}: {
  gameType: GameType;
  size?: number;
}) => {
  switch (gameType) {
    case "all":
      return null;
    case "music":
      return <MusicNote sx={{ fontSize: size }} />;
    case "history":
      return <Schedule sx={{ fontSize: size }} />;
  }
};
