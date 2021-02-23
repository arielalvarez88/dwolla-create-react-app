import {useCallback} from "react";
import {useLoadDwollaLib} from "./useDwollaLib";
/**
 * Create Verified Customer drop-in component
 *
 * @remarks
 * This components assumes that dwolla-components.js has been loaded, configured,
 * and is available in the global scope.
 */
export const CreateCustomer = () => {
    const success = useCallback((response)=>{
        console.log("Success: ", response);
    }, []);
    const onErrorConfiguringDwolla = useCallback((response)=>{
        console.error("error: ", response);
    }, []);
    const { ready, error } = useLoadDwollaLib({
      success,
      error: onErrorConfiguringDwolla,
    });
  
    if (error) {
      //Upper error boundary will catch.
      throw error;
    }
    if (!ready && !error) {
      return <span>loading...</span>;
    }
    return (
      <div>
        <dwolla-business-vcr privacy="/privacy-policy" terms="/terms-of-service"></dwolla-business-vcr>
      </div>
    );
  };