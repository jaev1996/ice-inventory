import { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import InventoryCard from '../components/InventoryCard';
import ProductForm from '../components/ProductForm';
import Modal from '../components/Modal';
import { IceProduct } from '../types/types';

const Inventory = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useInventory();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IceProduct | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);

  const handleAddProduct = (product: Omit<IceProduct, 'id'>) => {
    addProduct(product);
    setIsFormOpen(false);
  };

  const handleUpdateProduct = (product: IceProduct) => {
    updateProduct(product.id, product);
    setEditingProduct(null);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      deleteProduct(productToDelete);
      setProductToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <div className="flex space-x-2">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-md">
            Total productos: {products.length}
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
          >
            + Nuevo Producto
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <InventoryCard 
            key={product.id} 
            product={product}
            onEdit={() => setEditingProduct(product)}
            onDelete={() => setProductToDelete(product.id)}
          />
        ))}
      </div>

      {/* Modal para nuevo producto */}
      <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)}>
        <ProductForm 
          onSubmit={handleAddProduct} 
          onCancel={() => setIsFormOpen(false)}
        />
      </Modal>

      {/* Modal para editar producto */}
      <Modal isOpen={!!editingProduct} onClose={() => setEditingProduct(null)}>
        {editingProduct && (
          <ProductForm 
            initialData={editingProduct}
            onSubmit={(product) => {
              if ('id' in product) {
                handleUpdateProduct(product);
              }
            }}
            onCancel={() => setEditingProduct(null)}
            isEditing={true}
          />
        )}
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <Modal isOpen={!!productToDelete} onClose={() => setProductToDelete(null)}>
        <div className="bg-white p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Confirmar Eliminación</h2>
          <p className="mb-6 text-gray-600">
            ¿Estás seguro de que deseas eliminar este producto? Esta acción no se puede deshacer.
          </p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => setProductToDelete(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Inventory;