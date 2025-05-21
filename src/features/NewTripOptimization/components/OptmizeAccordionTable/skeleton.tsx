import { Accordion, AccordionSummary, Skeleton, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface OptimizeAccordionTableSkeletonProps {
  count?: number;
  height?: string;
}

export const OptimizeAccordionTableSkeleton = ({
  count = 3,
  height = "80px",
}: OptimizeAccordionTableSkeletonProps) => {
  return (
    <Stack>
      {[...Array(count)].map((_, index) => (
        <Accordion
          key={index}
          disabled
          sx={{
            height,
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-content": { alignItems: "center" },
              height: "60px",
            }}
          >
            <Skeleton variant="rectangular" width="60%" height={24} />
            <Skeleton
              variant="circular"
              width={24}
              height={24}
              sx={{ ml: "auto" }}
            />
          </AccordionSummary>
        </Accordion>
      ))}
    </Stack>
  );
};
