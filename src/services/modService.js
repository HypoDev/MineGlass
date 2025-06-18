import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from '../config/firebase';

const MODS_COLLECTION = 'mods';

export const modService = {
  // Get all mods
  async getAllMods() {
    try {
      const modsRef = collection(db, MODS_COLLECTION);
      const q = query(modsRef, orderBy('downloads', 'desc'));
      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching mods:', error);
      throw error;
    }
  },

  // Get mod by ID
  async getModById(id) {
    try {
      const modRef = doc(db, MODS_COLLECTION, id);
      const snapshot = await getDoc(modRef);
      
      if (snapshot.exists()) {
        return {
          id: snapshot.id,
          ...snapshot.data()
        };
      } else {
        throw new Error('Mod not found');
      }
    } catch (error) {
      console.error('Error fetching mod:', error);
      throw error;
    }
  },

  // Add new mod
  async addMod(modData, imageFile) {
    try {
      let logoURL = modData.imageUrl || '';
      
      // Upload image if provided
      if (imageFile) {
        logoURL = await this.uploadImage(imageFile, `mods/${Date.now()}_${imageFile.name}`);
      }

      const newMod = {
        ...modData,
        imageUrl: logoURL,
        logoURL: logoURL, // Store for deletion reference
        downloads: modData.downloads || 0,
        rating: modData.rating || 0,
        featured: modData.featured || false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, MODS_COLLECTION), newMod);
      return {
        id: docRef.id,
        ...newMod
      };
    } catch (error) {
      console.error('Error adding mod:', error);
      throw error;
    }
  },

  // Update mod
  async updateMod(id, modData, imageFile) {
    try {
      const modRef = doc(db, MODS_COLLECTION, id);
      const currentMod = await this.getModById(id);
      
      let logoURL = modData.imageUrl || currentMod.imageUrl;
      
      // Handle image update
      if (imageFile) {
        // Delete old image if it exists
        if (currentMod.logoURL) {
          await this.deleteImage(currentMod.logoURL);
        }
        
        // Upload new image
        logoURL = await this.uploadImage(imageFile, `mods/${Date.now()}_${imageFile.name}`);
      }

      const updatedMod = {
        ...modData,
        imageUrl: logoURL,
        logoURL: logoURL,
        updatedAt: new Date().toISOString()
      };

      await updateDoc(modRef, updatedMod);
      
      return {
        id,
        ...currentMod,
        ...updatedMod
      };
    } catch (error) {
      console.error('Error updating mod:', error);
      throw error;
    }
  },

  // Delete mod
  async deleteMod(id) {
    try {
      const mod = await this.getModById(id);
      
      // Delete image from storage if it exists
      if (mod.logoURL) {
        await this.deleteImage(mod.logoURL);
      }
      
      // Delete mod document
      await deleteDoc(doc(db, MODS_COLLECTION, id));
      
      return true;
    } catch (error) {
      console.error('Error deleting mod:', error);
      throw error;
    }
  },

  // Upload image to Firebase Storage
  async uploadImage(file, path) {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  },

  // Delete image from Firebase Storage
  async deleteImage(imageUrl) {
    try {
      if (!imageUrl) return;
      
      // Extract path from URL
      const url = new URL(imageUrl);
      const pathMatch = url.pathname.match(/\/o\/(.+)\?/);
      if (pathMatch) {
        const imagePath = decodeURIComponent(pathMatch[1]);
        const imageRef = ref(storage, imagePath);
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      // Don't throw error for image deletion failures
    }
  },

  // Search mods
  async searchMods(searchQuery, category = null) {
    try {
      const modsRef = collection(db, MODS_COLLECTION);
      let q = query(modsRef, orderBy('downloads', 'desc'));
      
      if (category) {
        q = query(modsRef, where('category', '==', category), orderBy('downloads', 'desc'));
      }
      
      const snapshot = await getDocs(q);
      let mods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Client-side filtering for search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        mods = mods.filter(mod =>
          mod.title?.toLowerCase().includes(query) ||
          mod.description?.toLowerCase().includes(query) ||
          mod.author?.toLowerCase().includes(query) ||
          mod.tags?.some(tag => tag.toLowerCase().includes(query))
        );
      }

      return mods;
    } catch (error) {
      console.error('Error searching mods:', error);
      throw error;
    }
  }
};