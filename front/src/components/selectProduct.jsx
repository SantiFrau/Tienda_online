import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useEffect } from 'react';

export default function ProdSelected({prodSelected,setProdSelected}){
   

    useEffect(() => {
        // Controlar el scroll del body cuando el diálogo está abierto
        if (prodSelected) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
    
        // Limpiar cuando el componente se desmonta o cuando el estado cambia
        return () => {
          document.body.style.overflow = "auto";
        };
      }, [prodSelected]);
   
    return (
        prodSelected ? (
            <div className="w-full h-screen fixed left-0 top-0 bg-black/75 flex items-center justify-center" onClick={() => { setProdSelected(false); }}>
              
              <div className="overflow-y-auto w-1/2 bg-white h-9/10 rounded-lg transition-all">
                
                <div className="w-full h-max flex flex-col items-center justify-center gap-10 py-10">
                  
                  <img className="w-1/3" src={prodSelected.image} alt="" />
                  <h4 className="w-2/3 font-bold text-xl">{prodSelected.title}</h4>
                  
                  <div className="w-2/3">
                    <span className="font-bold">Description</span>
                    <p>{prodSelected.description}</p>
                  </div>
  
                  <div className="flex flex-row items-center justify-between px-10 w-full">
                    <div className="p-2 rounded-full bg-green-200">
                      <AddShoppingCartIcon className="text-green-800" fontSize="large" />
                    </div>
                    <p className="text-green-600 font-bold text-xl">${prodSelected.price}</p>
                  </div>
  
  
                </div>
              </div>
            </div>
          ) : undefined
    )
}