import React from 'react';
import { useDispatch } from 'react-redux';
import { filterChange } from '../reducers/filterReducer';

const FilterComponents = () => {
    const dispach=  useDispatch()
    return (
        <div>
            All
            <input type="radio"
            name='filter'
            onChange={()=> dispach(filterChange('ALL'))}
             />
             important
             <input type="radio"
             name='filter'
             onChange={()=> dispach(filterChange('IMPORTANT'))}
              />
              not important
              <input type="radio"
              name='filter'
              onChange={()=> dispach(filterChange('NONIMPORTANT'))} />
        </div>
      )
}

export default FilterComponents