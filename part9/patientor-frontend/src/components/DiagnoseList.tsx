import React from 'react';
import { Header } from 'semantic-ui-react';
import { useStateValue } from '../state';

const DiagnoseList: React.FC<{ list: string[] | undefined }> = ({ list }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <div>
      {list ?
        <>
          <Header as="h4">Diagnoses</Header>
          <ul>
            {list.map((code: string) => (
              <li key={code}>{code} {diagnoses[code].name}</li>
            ))}
          </ul>
        </>
        :
        null
      }
    </div>
  );
};

export default DiagnoseList;