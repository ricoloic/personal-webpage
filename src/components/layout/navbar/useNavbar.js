import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLayout } from '../providers/LayoutProvider';

export const useNavbar = () => {
  const {
    sketchDescription,
    handleRefresh,
    handleSave,
    handleLooping,
    isLooping,
    controls,
  } = useLayout();
  const [openSketchDescription, setOpenSketchDescription] = React.useState(!!sketchDescription);
  const anchorEl = React.useRef(null);
  const [openOptions, setOpenOptions] = React.useState(false);
  const navigate = useNavigate();

  const handleOpenOptions = () => {
    setOpenOptions(true);
  };

  const handleCloseOptions = () => {
    setOpenOptions(false);
  };

  const handleOpenSketchDescription = () => {
    setOpenSketchDescription(true);
  };

  const handleCloseSketchDescription = () => {
    setOpenSketchDescription(false);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return {
    openSketchDescription,
    sketchDescription,
    handleOpenSketchDescription,
    handleCloseSketchDescription,
    openOptions,
    handleOpenOptions,
    handleCloseOptions,
    handleGoBack,
    handleRefresh,
    handleSave,
    handleLooping,
    isLooping,
    controls,
    anchorEl,
  };
};

export default useNavbar;
