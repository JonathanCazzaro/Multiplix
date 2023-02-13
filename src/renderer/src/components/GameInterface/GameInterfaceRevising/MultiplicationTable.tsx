import React from 'react';

const MultiplicationTable: React.FC<{ numeral: number }> = ({ numeral }) => {
  const table = Array.from({ length: 10 }, (_, index) => ({
    numeral: numeral,
    factor: index + 1,
    result: numeral * (index + 1)
  }));

  return (
    <div className="gameinterface__revising__table">
      <table>
        <tbody>
          {table
            .filter((table) => table.factor <= 5)
            .map(({ numeral, factor, result }, index) => (
              <tr key={`operation-left-${index}`} className="gameinterface__revising__table__row">
                <td className="gameinterface__revising__table__figure">{numeral}</td>
                <td>&#215;</td>
                <td className="gameinterface__revising__table__figure">{factor}</td>
                <td>&#61;</td>
                <td className="gameinterface__revising__table__result">{result}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <table>
        <tbody>
          {table
            .filter((table) => table.factor > 5)
            .map(({ numeral, factor, result }, index) => (
              <tr key={`operation-right-${index}`} className="gameinterface__revising__table__row">
                <td className="gameinterface__revising__table__figure">{numeral}</td>
                <td>&#215;</td>
                <td className="gameinterface__revising__table__figure">{factor}</td>
                <td>&#61;</td>
                <td className="gameinterface__revising__table__result">{result}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MultiplicationTable;
