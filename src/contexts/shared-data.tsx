import { createContext, createResource, createSignal, ParentComponent, useContext } from "solid-js";
import { useAuth } from "./auth";
import { ClusterInfo, getClusters } from "../api/cluster";
import { createQuery } from "@tanstack/solid-query";

interface SharedDataContextData {
  clusters: () => ClusterInfo[]
}


const SharedDataContext = createContext<SharedDataContextData | null>(null);

export const useSharedData = () => {
  const context = useContext(SharedDataContext)
  if (!context)
    throw new Error(
      'useSharedData must be used within a SharedDataProvider'
    )
  return context
}

export const SharedDataProvider: ParentComponent = (props) => {
  const auth = useAuth()
  const clusterQuery = createQuery<ClusterInfo[]>(() => ({
    queryKey: ['clusters'],
    queryFn: async () => {
      return getClusters(await auth.getAccessToken())
    },
    enabled: auth.isAuthenticated(),
  }))

  const clusters = () => clusterQuery.data || []

  return (
    <SharedDataContext.Provider
      value={{
        clusters
      }}
    >
      {props.children}
    </SharedDataContext.Provider>
  )
}