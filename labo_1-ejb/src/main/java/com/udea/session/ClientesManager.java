/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.udea.session;

import com.udea.entity.Clientes;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

/**
 *
 * @author sebas
 */
@Stateless
public class ClientesManager implements ClientesManagerLocal {

    @PersistenceContext(unitName = "com.udea_labo_1-ejb_ejb_1.0-SNAPSHOTPU")
    private EntityManager em;

    @Override
    public List<Clientes> getAllClientes() {
        Query query= em.createNamedQuery("Clientes.findAll");
        return query.getResultList();
    }
    
    
}
