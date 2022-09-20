import type { IStarknetWindowObject } from "get-starknet";
import { connect } from "get-starknet";
import { get, writable } from "svelte/store";
import _baseStore from "./_baseStore";

const store = writable<IStarknetWindowObject>();

const starknetStore = _baseStore(
  store,
  ({ set, subscribe, _subscribeOnce }) => {
    async function handleAccountsChange() {
      const st = await connect({ showList: false });

      set(st);
    }

    _subscribeOnce((data) => {
      if (!data) {
        return false;
      }
      console.log(`has data: ${!!data}`)
      console.log("attach listener")
      data?.on("accountsChanged", handleAccountsChange);

      return true;
    });

    return {
      subscribe,
      set,
    };
  }
);

export default starknetStore;
