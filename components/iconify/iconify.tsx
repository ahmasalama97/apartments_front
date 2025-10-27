"use client";

import type { IconProps } from "@iconify/react";
import { useId } from "react";
import { Icon } from "@iconify/react";
import { mergeClasses } from "minimal-shared/utils";
import { styled } from "@mui/material/styles";

import { iconifyClasses } from "./classes";
import { allIconNames, registerIcons } from "./register-icons";
import type { IconifyName } from "./register-icons";

// ----------------------------------------------------------------------

export type IconifyProps = React.ComponentProps<typeof IconRoot> &
  Omit<IconProps, "icon"> & {
    icon: IconifyName;
    width?: number | string;
    height?: number | string;
  };

export function Iconify({
  className,
  icon,
  width = 20,
  height,
  sx,
  ...other
}: IconifyProps) {
  const id = useId();

  // Register once (icons from your `register-icons.ts`)
  registerIcons();

  if (!allIconNames.includes(icon)) {
    console.warn(
      [
        `⚠️ Icon "${icon}" is being loaded online, which may cause flickering.`,
        `👉 Register it in "register-icons.ts" for offline use.`,
        `Docs: https://docs.minimals.cc/icons/`,
      ].join("\n")
    );
  }

  return (
    <IconRoot
      id={id}
      icon={icon}
      className={mergeClasses([iconifyClasses.root, className])}
      sx={[
        {
          width,
          height: height ?? width,
          display: "inline-flex",
          flexShrink: 0,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  );
}

// ----------------------------------------------------------------------

const IconRoot = styled(Icon)``;
