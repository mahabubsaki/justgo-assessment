import React, { useContext } from 'react';
import { ProjectContext } from '../App';

const ToggleButton = () => {
    const { tileView, setTileView } = useContext(ProjectContext)
    return (
        <div class="form-control">
            <label class="label cursor-pointer flex justify-center">
                <span class="label-text mr-3">Tile View</span>
                <input type="checkbox" class="toggle toggle-accent toggle-lg" checked={tileView} onChange={(e) => setTileView(e.target.checked)} />
            </label>
        </div>
    );
};

export default ToggleButton;