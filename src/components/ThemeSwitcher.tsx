import { Button, useTheme } from "@heroui/react";
import { MoonIcon, SunDimIcon } from "@phosphor-icons/react";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme("dark");

  return (
    <Button
      variant="secondary"
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? (
        <SunDimIcon size={32} />
      ) : (
        <MoonIcon size={32} />
      )}
    </Button>
  );
}
