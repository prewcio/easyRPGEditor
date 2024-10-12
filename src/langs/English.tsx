import React, { useEffect, useState } from 'react';
import Req from '../Req';
export default function English() {
    const [status, setStatus] = useState("mainPage");

    const [character, setCharacter] = useState({
      name: '',
      race: '',
      class: '',
      alg: '',
      bcg: '',
      exp: 0,
      lvl: 0,
      desc: ''
    });
  
    const [importedCharacter, setImportedCharacter] = useState({
      name: '',
      race: '',
      class: '',
      alg: '',
      bcg: '',
      exp: 0,
      lvl: 0,
      desc: ''
    });
  
    const [hc, setHc] = useState(false);
    const [edit, setEdit] = useState(false);
    const [tillNext, setTillNext] = useState("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value, type } = e.target;
      if (name === 'hc' && e.target instanceof HTMLInputElement) {
        const { checked } = e.target; // Extract checked after type guard
        setHc(checked);
      } 
      else if (name === 'edit' && e.target instanceof HTMLInputElement) {
        const { checked } = e.target; // Extract checked after type guard
        setEdit(checked);
      }
      else {
        setCharacter(prevState => {
          const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
          const newExp = name === 'exp' ? parseInt(newValue as string, 10) : prevState.exp;
          const updatedCharacter = {
            ...prevState,
            [name]: newValue,
            lvl: calculateLevel(newExp)
          };
          setTillNext(calculateTillNext(newExp));
          return updatedCharacter;
        });
      }
    };
  
    const downloadCharacter = () => {
      const characterData = JSON.stringify(character, null, 2);
      const blob = new Blob([characterData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${character.name || 'character'}.rpg.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
  
    const defaultExp = 300;
    const calculateTillNext = (exp: number): string => {
      let level = 0;
      let requiredExp = defaultExp;
      while (exp >= requiredExp) {
        level++;
        exp -= requiredExp;
        requiredExp = defaultExp + (level * (defaultExp*0.1)); // 10% of 300 is 30
      }
      let expTillNext;
      if (exp < requiredExp) {
        expTillNext = ((exp / requiredExp) * 100).toFixed(0);
      }
      return `(${expTillNext}%)`;
    };
  
    const calculateLevel = (exp: number): number => {
      let level = 0;
      let requiredExp = defaultExp;
      while (exp >= requiredExp) {
        level++;
        exp -= requiredExp;
        requiredExp = defaultExp + (level * (defaultExp*0.1)); // 10% of 300 is 30
      }
      return level;
    };
  
    const isCharacterValid = (): boolean => {
      return character.name !== '' && character.race !== '' && character.class !== '' && character.alg !== '' && character.bcg !== '';
    };
  
    const handleDownloadClick = () => {
      if (isCharacterValid()) {
        downloadCharacter();
      } else {
        alert('Please fill in all required fields.');
      }
    };
  
    const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        // Check if the file has the correct extension
        if (!file.name.endsWith('.rpg.json')) {
          alert('Invalid file format. Please choose a file with .rpg.json extension.');
          return;
        }
  
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const importedData = JSON.parse(event.target?.result as string);
            setImportedCharacter(importedData);
            setStatus('importCharacter');
          } catch (error) {
            alert('Invalid file format.');
          }
        };
        reader.readAsText(file);
      }
    };
  
    // Function to download the modified imported character
    const downloadImportedCharacter = () => {
      const characterData = JSON.stringify(importedCharacter, null, 2);
      const blob = new Blob([characterData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${importedCharacter.name || 'imported_character'}.rpg.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
  
    return (
        <>
        {status === 'mainPage' &&
        <div className="content">
            <h3>RPG EDITOR</h3>
            <div className="eleme">
                <p className="p-btn" onClick={() => setStatus('createCharacter')}>CREATE NEW CHARACTER</p>
                <p>OR</p>
                <label htmlFor="import"><p className="p-btn">IMPORT CHARACTER</p><input type="file" name="import" id="import" accept=".rpg.json" style={{visibility: 'hidden', height: '0px'}} onChange={handleFileImport}/></label>
            </div>
        </div>
      }
      {status === 'createCharacter' &&
        <div className="content">
          <h3>CREATE CHARACTER</h3>
          <form className="charEle">
          <label htmlFor='name'><p>Character Name <Req /></p><input type="text" name='name' id='name' value={character.name} onChange={handleChange} required/></label>
            <label htmlFor='race'><p>Character Race <Req /></p><input type="text" name='race' id='race' value={character.race} onChange={handleChange} required/></label>
            <label htmlFor='class'><p>Character Class <Req /></p><input type="text" name='class' id='class' value={character.class} onChange={handleChange} required/></label>
            <label htmlFor='alg'><p>Origin <Req /></p><input type="text" name='alg' id='alg' value={character.alg} onChange={handleChange} required/></label>
            <label htmlFor='bcg'><p>Character Background <Req /></p><input type="text" name='bcg' id='bcg' value={character.bcg} onChange={handleChange} required/></label><br/>
            <label htmlFor='hc' style={{fontWeight: '600'}}>HANDICAP<input type="checkbox" name='hc' id='hc' checked={hc} onChange={handleChange}/></label>
            <div className="handicap">
              <label htmlFor='exp'><p>Experience</p><input type="number" min={0} name='exp' id='exp' value={character.exp} onChange={handleChange} disabled={!hc}/></label>
              <label htmlFor='lvl'><p>Level</p><input type="text" name='lvl' id='lvl' value={`${character.lvl} ${tillNext}`} disabled/></label>
            </div>
          <label htmlFor='desc'><p>Character Description</p><textarea onResize={(e) => e.preventDefault()} style={{resize:'vertical'}} name='desc' id='desc' value={character.desc} onChange={handleChange}/></label>
          <label htmlFor='download'><p className='p-btn' onClick={handleDownloadClick}>CREATE CHARACTER</p><input type='submit' style={{visibility:'hidden'}}/></label>
          <p className='p-btn' onClick={() => setStatus('mainPage')}>RETURN</p>
          </form>
        </div>
      }
      {status === 'importCharacter' &&
        <div className="content">
          <h3>VIEW CHARACTER</h3>
          <form className="charEle">
            <label htmlFor='edit' style={{fontWeight: '600'}}>EDIT MODE<input type="checkbox" name='edit' id='edit' checked={edit} onChange={handleChange}/></label>
            <label htmlFor='name'><p>Character Name <Req /></p><input type="text" name='name' id='name' value={importedCharacter.name} onChange={(e) => setImportedCharacter({...importedCharacter, name: e.target.value})} required disabled={!edit}/></label>
            <label htmlFor='race'><p>Character Race <Req /></p><input type="text" name='race' id='race' value={importedCharacter.race} onChange={(e) => setImportedCharacter({...importedCharacter, race: e.target.value})} required disabled={!edit}/></label>
            <label htmlFor='class'><p>Character Class <Req /></p><input type="text" name='class' id='class' value={importedCharacter.class} onChange={(e) => setImportedCharacter({...importedCharacter, class: e.target.value})} required disabled={!edit}/></label>
            <label htmlFor='alg'><p>Origin <Req /></p><input type="text" name='alg' id='alg' value={importedCharacter.alg} onChange={(e) => setImportedCharacter({...importedCharacter, alg: e.target.value})} required disabled={!edit}/></label>
            <label htmlFor='bcg'><p>Character Background <Req /></p><input type="text" name='bcg' id='bcg' value={importedCharacter.bcg} onChange={(e) => setImportedCharacter({...importedCharacter, bcg: e.target.value})} required disabled={!edit}/></label>
            <label htmlFor='exp'><p>Experience</p><input type="number" min={0} name='exp' id='exp' value={importedCharacter.exp} onChange={(e) => setImportedCharacter({...importedCharacter, exp: parseInt(e.target.value, 10)})} disabled={!edit}/></label>
            <label htmlFor='lvl'><p>Level</p><input type="text" name='lvl' id='lvl' value={`${importedCharacter.lvl} ${tillNext}`} disabled/></label>
            <label htmlFor='desc'><p>Character Description</p><textarea onResize={(e) => e.preventDefault()} style={{resize:'vertical'}} name='desc' id='desc' value={importedCharacter.desc} onChange={(e) => setImportedCharacter({...importedCharacter, desc: e.target.value})} disabled={!edit}/></label>
            <label htmlFor='download'><p className='p-btn' onClick={downloadImportedCharacter}>SAVE CHARACTER</p><input type='submit' style={{visibility:'hidden'}}/></label>
            <p className='p-btn' onClick={() => setStatus('mainPage')}>RETURN</p>
          </form>
        </div>
      }
    </>
    )
}