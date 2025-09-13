import { Injectable } from '@angular/core';
import { Producto } from '../modelos/producto';
@Injectable({
    providedIn: 'root'
})
export class Productos {
    private xmlUrl = '/assets/catalogo.xml';
    constructor() {}
    async getProductos(): Promise<Producto[]> {
        try {
            const response = await fetch(this.xmlUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const xmlString = await response.text();
            const productos = this.parseXML(xmlString);
            return productos;
        } catch (error) {
            return [
                { id: 1, nombre: 'Producto Test 1', precio: 100 },
                { id: 2, nombre: 'Producto Test 2', precio: 200 }
            ];
        }
    }
    private parseXML(xmlString: string): Producto[] {
        try {
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlString, 'text/xml');
            const parseError = xml.querySelector('parsererror');
            if (parseError) {
                throw new Error('XML parsing error: ' + parseError.textContent);
            }
            const productos: Producto[] = [];
            const nodes = xml.getElementsByTagName('producto');
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                console.log(`🔍 Procesando producto ${i + 1}:`);
                const idElement = node.getElementsByTagName('id')[0];
                const nombreElement = node.getElementsByTagName('nombre')[0];
                const precioElement = node.getElementsByTagName('precio')[0];
                if (idElement && nombreElement && precioElement) {
                    const producto = {
                        id: Number(idElement.textContent?.trim()),
                        nombre: String(nombreElement.textContent?.trim()),
                        precio: Number(precioElement.textContent?.trim())
                    };
                    productos.push(producto);
                }
            }
            return productos;
        } catch (error) {
            return [];
        }
    }
}