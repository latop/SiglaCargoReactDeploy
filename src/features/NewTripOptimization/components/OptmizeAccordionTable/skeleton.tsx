import { Accordion, AccordionSummary, Skeleton, Stack } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface OptimizeAccordionTableSkeletonProps {
  count?: number;
}

export const OptimizeAccordionTableSkeleton = ({
  count = 3,
}: OptimizeAccordionTableSkeletonProps) => {
  return (
    <Stack spacing={0.5}>
      {[...Array(count)].map((_, index) => (
        <Accordion key={index} disabled>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              "& .MuiAccordionSummary-content": { alignItems: "center" },
              height: "60px",
            }}
          >
            <Skeleton variant="text" width="60%" height={24} />
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
