import { City } from "@/type";
import Link from "next/link";
import React from "react";

const SearchComponent = ({
  onChange,
  autocompleteOptions,
  resetOptionsArray,
}: {
  onChange: Function;
  autocompleteOptions: Array<City>;
  resetOptionsArray: Function;
}) => {
  return (
    <div>
      <div className="group">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
          </g>
        </svg>

        <input
          id="query"
          className="input"
          type="search"
          placeholder="Search city..."
          name="searchbar"
          onChange={(e) => onChange(e.target.value)}
          style={{
            borderRadius:
              autocompleteOptions.length > 0 ? "10px 10px 0 0" : "10px",
          }}
        />
      </div>
      {autocompleteOptions.length > 0 && (
        <div
          style={{
            position: "absolute",
            width: "403px",
            padding: "18px",
            marginLeft: "-1px",
            borderRadius: "0 0 10px 10px",
            zIndex: 1,
            backgroundColor: "#16171d",
          }}>
          {autocompleteOptions.map((option, index) => (
            <React.Fragment key={index}>
              <Link
                href={`/weatherpage?lat=${option.latitude}&lon=${option.longitude}&city=${option.name}&timezone=${option.timezone}&country_code=${option.country_code}`}
                onClick={() => resetOptionsArray()}>
                <div>
                  {option.name}, {option.country}
                </div>
              </Link>
              {index < autocompleteOptions.length - 1 && (
                <hr
                  style={{
                    border: "1px solid #bdbecb",
                    width: "100%",
                    margin: "auto",
                    opacity: "0.4",
                    borderRadius: "0.5px",
                    marginTop: "5px",
                    marginBottom: "5px",
                  }}
                />
              )}{" "}
              {/* Render a horizontal line as a separator if this is not the last element */}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
