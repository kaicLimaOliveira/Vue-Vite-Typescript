interface Generic<T> {
  [key: string]: T
}

interface StateView {
  isLoading: boolean;
  isLoadingButton: boolean;
  
  tableProps: {
    itemsPerPage: number;
    tableLength: number;
    tableCurrentPage: number;
  }
  
  objectViewMode: string;
  openModal: boolean;
  showDeleteModal: boolean;
}

export type {
  Generic,
  StateView,
}