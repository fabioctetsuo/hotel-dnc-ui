import Link from "next/link";
import { getPaginationRange } from "./helper";

const pagesStyles =
  "mx-1 flex items-center justify-center w-12 h-12 bg-white text-xl font-bold text-light-grey-800 border border-light-grey-300 rounded-lg hover:bg-snow-white";
const arrowsStyles =
  "flex items-center justify-center w-12 h-12 bg-light-grey-400 text-xl font-bold text-light-grey-800 rounded-lg hover:bg-light-grey-500";
const activePageStyles =
  "mx-1 flex items-center justify-center w-12 h-12 bg-white text-xl font-bold text-main-brand-green-300 border border-main-brand-green-300 rounded-lg hover:bg-snow-white";
const disabledStyles =
  "pointer-events-none aria-disabled:bg-slate-100 aria-disabled:text-slate-400 aria-disabled:cursor-not-allowed";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  href: string;
};

export const Pagination = ({
  currentPage = 1,
  totalPages,
  href,
}: PaginationProps) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = totalPages === currentPage;

  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="flex">
          <li>
            <Link
              href={{
                pathname: href,
                query: { page: 1 },
              }}
              className={`${arrowsStyles} ${isFirstPage ? disabledStyles : ""}`}
              aria-disabled={isFirstPage}
            >
              {`<`}
            </Link>
          </li>
          {getPaginationRange(currentPage, totalPages).map((page) => {
            const isCurrent = currentPage === page;
            const styles = isCurrent ? activePageStyles : pagesStyles;

            return (
              <li key={page}>
                <Link
                  href={{
                    pathname: href,
                    query: { page },
                  }}
                  className={styles}
                >
                  {page}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              href={{
                pathname: href,
                query: { page: totalPages },
              }}
              className={`${arrowsStyles} ${isLastPage ? disabledStyles : ""}`}
            >
              {`>`}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
