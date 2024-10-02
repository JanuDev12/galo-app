import { useEffect, useState } from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';

function DialogBeta() {
     const [isDialogOpen, setIsDialogOpen] = useState(false);

     useEffect(() => {
       // Verificar si ya se ha mostrado el diálogo
       const dialogShown = localStorage.getItem("betaDialogShown");
       if (!dialogShown) {
         setIsDialogOpen(true); // Mostrar diálogo si no ha sido mostrado antes
       }
     }, []);

     const handleContinue = () => {
       // Guardar en localStorage que el diálogo ya ha sido mostrado
       localStorage.setItem("betaDialogShown", "true");
       setIsDialogOpen(false);
     };
  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogContent className="bg-[--color-primary] border-none max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl text-red-500">
            Important, this is a demo
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white text-base leading-relaxed ">
            This web application is just an <strong>early-stage concept</strong>, so many of its features are still under development. Its normal to
            encounter errors and bugs at this stage. Since this is an
            experimental project, images are not stored in a database, meaning
            they are unstable and may be lost.{" "}
            <strong>Please keep this in mind.</strong>
            <br />
            <br />
            If something doesnt work as expected, try refreshing the page. If
            this idea interests you and youd like to see it evolve, feel free to
            let me know.
            <br />
            <br />
            Thank you for trying out this little idea! ❤️
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={handleContinue}
            className="bg-[--color-light] text-[--color-secondary] hover:bg-[--color-light-tertiary]"
          >
            Yes, I understand!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DialogBeta