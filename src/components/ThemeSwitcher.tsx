import { Button, useTheme } from "@heroui/react";

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme("dark");

  return (
    <Button
      variant="secondary"
      onPress={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      {resolvedTheme === "dark" ? "☀️" : "🌙"}
    </Button>
  );
}
