import { useDispatch, useSelector } from 'react-redux';
import { onItemModalHandler, setSelectedProduct, clearSelectedProduct, onSideBarOpenHandler } from '../store';

export const useUiStore = () => {
  
  const { isCartWidgetEmpty, isActiveEvent, isItemModalOpen, selectedProduct, isSideBarOpen } = useSelector( state => state.ui );
  const dispatch = useDispatch();
  
  const handlerProductDetail = ( product ) => {
    dispatch( setSelectedProduct( product ) );
    dispatch( onItemModalHandler() );
  }

  const ClearModal = () => {
    dispatch( clearSelectedProduct() );
    dispatch( onItemModalHandler() );
  }

  const toggleItemModal = () => {
    dispatch( onItemModalHandler() );
  }

  const toggleSideBar = () => {
    console.log('toggleSideBar')
    dispatch( onSideBarOpenHandler() );
  }

  return {
    handlerProductDetail,
    toggleItemModal,
    toggleSideBar,
    ClearModal,
    isCartWidgetEmpty,
    isSideBarOpen,
    isActiveEvent,
    isItemModalOpen,
    selectedProduct
  }
}
