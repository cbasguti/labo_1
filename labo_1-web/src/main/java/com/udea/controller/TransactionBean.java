/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.controller;

import com.udea.entity.Clientes;
import com.udea.session.ClientesManagerLocal;
import java.io.Serializable;
import java.util.Date;
import java.util.List;
import javax.ejb.EJB;

/**
 *
 * @author sebas, victor y otros
 */
public class TransactionBean implements Serializable {

    @EJB
    private ClientesManagerLocal clientesManager;

    private Clientes cliente;
    private List<Clientes> clientes;

    /**
     * Creates a new instance of TransactionBean
     */
    public TransactionBean() {
        cliente = new Clientes();
    }

    public List<Clientes> getClientes() {        
        if ((clientes == null) || (clientes.isEmpty())) {
            refresh();
        }
        return clientes;
    }

    public Clientes getDetails() {
        return cliente;
    }

    public String create() {
        System.out.println("###CREATE###");

        //añadimos el código correspondiente
        List<Clientes> lista = getClientes();
        int maxcode = 0;
        for (Clientes clt : lista) {
            if (clt.getCodigo() > maxcode) {
                maxcode = clt.getCodigo();
            }
        }
        cliente.setCodigo(maxcode + 1);//<----- código más alto encontrado + 1
        
        //añadimos la fecha actual a esta webada
        Date date = new Date();        
        cliente.setFechaTra(date);        

        //Se añade a la DB y se actualiza la lista
        cliente = clientesManager.addClient(cliente);
        refresh();
        return "SAVED";
    }

    public void refresh() {
        clientes = clientesManager.getAllClientes();
    }

    public String validate() {
        if (!cliente.getNombre().matches("^[a-zA-Z]*$")) {
            System.out.println("El nombre no es válido");
            return null;
        }
        
        if (!cliente.getApellido().matches("^[a-zA-Z]*$")) {
            System.out.println("El apellido no es válido");
            return null;
        }
        
        if (!cliente.getEmail().matches("^(.+)@(.+)$")) {
            System.out.println("El email no es válido");
            return null;
        }
        
        if (cliente.getCvv() < 100 || cliente.getCvv() > 999) {
            System.out.println("El cvv no es válido");
            return null;
        }
        
        if(cliente.getValor() < 5000 || cliente.getValor() > 10000) {
            System.out.println("El valor de la transaccion no es válido");
            return null;
        }
        
        if (!cliente.getFechaVenc().matches("^\\d{4}-\\d{2}-\\d{2}$")) {
            System.out.println("La fecha de vencimiento no es válida");
            return null;
        }
        
        create();
        return "SAVED";
    }

}
