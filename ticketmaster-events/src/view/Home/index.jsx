import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar";
import Events from "../../components/Events";
import useEventsData from "../../hooks/useEventsData";
import ReactPaginate from "react-paginate";

export default function Home() {
  const { events, isLoading, error, fetchEvents, page } = useEventsData();

  const [searchTerm, setSearchTem] = useState("");
  const containerRef = useRef();

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleNavbarSearch = (term) => {
    setSearchTem(term);
    fetchEvents(`&keyword=${term}`);
  };

  const handlePageClick=({selected})=>{
    console.log(selected)

  }

  const renderEvents = () => {
    if (isLoading) {
      return <div>Cargando resultados....</div>;
    }

    if (error) {
      return <div>Ha ocurrido un error</div>;
    }

    return (
      <div>
        <Events searchTerm={searchTerm} events={events} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={page.totalPages}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      </div>
    );
  };

  return (
    <>
      <Navbar onSearch={handleNavbarSearch} ref={containerRef} />
      {renderEvents()}
    </>
  );
}
