import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const LogoutPopup = ({ onConfirm, onCancel }: any) => {
  return (
    <div style={{zIndex:'1'}} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <p className="text-lg font-semibold mb-4">Tem certeza que deseja sair?</p>
        <div className="flex justify-center gap-4">
          <Button style={{textDecoration:'none'}} onClick={onConfirm} variant={'link'} className=" bg-blue-500  hover:text-white text-white font-bold px-4 py-2 rounded">
            <Link href="/">Sair</Link>
          </Button>
          <Button onClick={onCancel} variant={'destructive'} className="text-black font-bold">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
};

const LogoutButton = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleLogout = () => {
    console.log("Usuário deslogado!");
    setShowPopup(false);
    
  };

  return (
    <div>
      <Button variant={'outline'} onClick={() => setShowPopup(true)} className="text-black font-bold px-4 py-2 rounded">
        Logout
      </Button>

      {showPopup && <LogoutPopup onConfirm={handleLogout} onCancel={() => setShowPopup(false)} />}
    </div>
  );
};

export default LogoutButton;
