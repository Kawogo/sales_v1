import React, { useState } from 'react';

import Select from 'react-select';

export default ({options,id,name}) => {

  return (
    <>
      <Select
        className="basic-single"
        classNamePrefix="select"
        isClearable={true}
        isSearchable={true}
        name={name}
        id={id}
        options={options}
      />
    </>
  );
};