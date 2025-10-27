import { mergeClasses } from "minimal-shared/utils";
import { styled } from "@mui/material/styles";
import { Tooltip } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import { colorPreviewClasses } from "./classes";

// ----------------------------------------------------------------------

export type ColorPreviewSlotProps = {
  item?: React.ComponentProps<typeof ItemRoot>;
  label?: React.ComponentProps<typeof ItemLabel>;
};

export type ColorPreviewProps = React.ComponentProps<typeof ColorPreviewRoot> & {
  limit?: number;
  size?: number;
  gap?: number;
  colors: string[];
  slotProps?: ColorPreviewSlotProps;
};

export function ColorPreview({
  sx,
  colors,
  className,
  slotProps,
  gap = 6,
  limit = 3,
  size = 16,
  ...other
}: ColorPreviewProps) {
  const [expanded, setExpanded] = useState(false);

  const visibleColors = expanded ? colors : colors?.slice(0, limit);
  const remainingColorCount = colors?.length - limit;

  return (
    <ColorPreviewRoot
      className={mergeClasses([colorPreviewClasses.root, className])}
      sx={sx}
      {...other}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <AnimatePresence initial={false}>
        {visibleColors?.map((color, index) => (
          <Tooltip key={color + index} title={color}>
            <motion.li
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <ItemRoot
                aria-label={`Color ${color}`}
                className={colorPreviewClasses.item}
                {...slotProps?.item}
                sx={[
                  {
                    "--item-color": color,
                    "--item-size": `${size}px`,
                    "--item-gap": `${-gap}px`,
                  },
                  ...(Array.isArray(slotProps?.item?.sx)
                    ? (slotProps.item?.sx ?? [])
                    : [slotProps?.item?.sx]),
                ]}
              />
            </motion.li>
          </Tooltip>
        ))}
      </AnimatePresence>

      {!expanded && colors?.length > limit && (
        <ItemLabel className={colorPreviewClasses.label} {...slotProps?.label}>
          +{remainingColorCount}
        </ItemLabel>
      )}
    </ColorPreviewRoot>
  );
}

// ----------------------------------------------------------------------

const ColorPreviewRoot = styled("ul")(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-end",
  cursor: "pointer",
  padding: 0,
  margin: 0,
  listStyle: "none",
  gap: 2,
}));

const ItemRoot = styled("div")(({ theme }) => ({
  borderRadius: "50%",
  width: "var(--item-size)",
  height: "var(--item-size)",
  marginLeft: "var(--item-gap)",
  backgroundColor: "var(--item-color)",
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px rgba(0,0,0,0.4)`,
}));

const ItemLabel = styled("li")(({ theme }) => ({
  ...theme.typography.subtitle2,
  marginLeft: 4,
  color: theme.palette.text.secondary,
}));
