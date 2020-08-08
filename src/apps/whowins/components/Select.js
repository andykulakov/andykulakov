import React, { useState, useEffect, useRef } from "react";

const Select = ({ value, options, label, id, error, onChange }) => {
  const selectEl = useRef(null);
  const inputEl = useRef(null);
  const listboxEl = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [listboxOpened, setListboxOpened] = useState(false);

  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  useEffect(() => {
    function scrollToOption() {
      const focusedOption = filteredOptions[focusedOptionIndex];
      if (focusedOption) {
        const focusedOptionEl = document.getElementById(
          `option-${id}-${focusedOption.id}`
        );

        if (
          focusedOptionEl &&
          listboxEl.current.scrollHeight > listboxEl.current.clientHeight
        ) {
          let scrollBottom =
            listboxEl.current.clientHeight + listboxEl.current.scrollTop;
          let elementBottom =
            focusedOptionEl.offsetTop + focusedOptionEl.offsetHeight;
          if (elementBottom > scrollBottom) {
            listboxEl.current.scrollTop =
              elementBottom - listboxEl.current.clientHeight;
          } else if (focusedOptionEl.offsetTop < listboxEl.current.scrollTop) {
            listboxEl.current.scrollTop = focusedOptionEl.offsetTop;
          }
        }
      }
    }

    if (listboxOpened && inputValue.length > 0) {
      scrollToOption();
    }
  }, [id, filteredOptions, focusedOptionIndex, listboxOpened, inputValue]);

  const [filteredOptions, setFilteredOptions] = useState([]);
  useEffect(() => {
    setFilteredOptions(
      options.filter((option) =>
        option.name.toLowerCase().includes(inputValue.toLowerCase())
      )
    );
    setFocusedOptionIndex(0);
  }, [inputValue, options]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!event.path.includes(selectEl.current)) {
        resetSelect();
      }
    }

    document.addEventListener("click", handleClickOutside);
    return function () {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  function chooseOption(option) {
    if (!option) {
      option = filteredOptions[focusedOptionIndex];
    }
    if (!value || value.id !== option.id) {
      onChange(option);
    }
    resetSelect();
  }

  function resetSelect() {
    setListboxOpened(false);
    resetInput();
  }

  function resetInput() {
    inputEl.current.blur();
    setInputValue("");
  }

  function handleKeyPressOption(event) {
    switch (event.key) {
      case "ArrowUp":
        setFocusedOptionIndex(
          focusedOptionIndex > 0
            ? focusedOptionIndex - 1
            : filteredOptions.length - 1
        );
        break;
      case "ArrowDown":
        setFocusedOptionIndex(
          focusedOptionIndex < filteredOptions.length - 1
            ? focusedOptionIndex + 1
            : 0
        );
        break;
      case "Escape":
        setListboxOpened(false);
        resetInput();
        break;
      case "Enter":
        chooseOption(null);
        break;
      default:
        break;
    }
  }

  return (
    <div
      ref={selectEl}
      className={`ww-select ${error ? "ww-select_error" : ""}`}
      // eslint-disable-next-line jsx-a11y/role-has-required-aria-props
      role="combobox"
      aria-haspopup="listbox"
      aria-expanded={listboxOpened}
      aria-owns={`listbox-${id}`}
    >
      <label
        id={`label-${id}`}
        htmlFor={`input-${id}`}
        className="ww-select__label"
      >
        {label}
      </label>
      <input
        id={`input-${id}`}
        ref={inputEl}
        className="ww-select__input"
        value={inputValue}
        placeholder="Search"
        type="text"
        aria-labelledby={`label-${id}`}
        aria-autocomplete="list"
        aria-controls={`listbox-${id}`}
        aria-activedescendant={
          listboxOpened &&
          inputValue.length > 0 &&
          filteredOptions[focusedOptionIndex]
            ? `option-${id}-${filteredOptions[focusedOptionIndex].id}`
            : null
        }
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => handleKeyPressOption(e)}
        onFocus={() => setListboxOpened(true)}
      />
      {filteredOptions.length > 0 ? (
        <ul
          id={`listbox-${id}`}
          ref={listboxEl}
          className={`ww-select__listbox ${
            listboxOpened && inputValue.length > 0
              ? "ww-select__listbox_opened"
              : ""
          }`}
          role="listbox"
          aria-labelledby={`label-${id}`}
        >
          {filteredOptions.map((option, i) => (
            <li
              key={`select-option-${i}`}
              id={`option-${id}-${option.id}`}
              className={`ww-select__listbox__option ${
                i === focusedOptionIndex
                  ? "ww-select__listbox__option_focused"
                  : ""
              } ${
                value && value.id === option.id
                  ? "ww-select__listbox__option_active"
                  : ""
              }`}
              role="option"
              aria-selected={i === focusedOptionIndex}
              onClick={() => chooseOption(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      ) : (
        <div
          className={`ww-select__listbox ww-select__listbox_empty ${
            listboxOpened && inputValue.length > 0
              ? "ww-select__listbox_opened"
              : ""
          }`}
        >
          No results
        </div>
      )}
    </div>
  );
};

export default Select;
